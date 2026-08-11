"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, PencilSimple } from "@phosphor-icons/react";
import {
  fetchAdminProducts,
  saveProduct,
  setProductActive,
  uploadProductImage,
  type AdminProduct,
  type ProductInput,
} from "@/lib/admin";
import { CATEGORIES, type Category } from "@/lib/products";
import { money } from "@/lib/whatsapp";
import { queryKeys } from "@/lib/query-keys";

const EMPTY_FORM: ProductInput = {
  slug: "",
  name: "",
  category: "difusores",
  price: null,
  variant: "",
  sizes: [],
  description: "",
  mode: "buy",
  imageUrl: "",
  active: true,
};

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ProductInput | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    data: products,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.admin.products,
    queryFn: fetchAdminProducts,
  });

  const invalidateProducts = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.products }),
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all }),
    ]);

  const { mutate: submitProduct, isPending: isSaving } = useMutation({
    mutationFn: async (input: ProductInput) => {
      const imageUrl = imageFile
        ? await uploadProductImage(imageFile, input.slug)
        : input.imageUrl;
      await saveProduct({ ...input, imageUrl });
    },
    onSuccess: async () => {
      await invalidateProducts();
      setForm(null);
      setImageFile(null);
    },
  });

  const { mutate: toggleActive } = useMutation({
    mutationFn: (vars: { id: string; active: boolean }) =>
      setProductActive(vars.id, vars.active),
    onSuccess: invalidateProducts,
  });

  const openNew = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
  };
  const openEdit = (p: AdminProduct) => {
    setForm({ ...p });
    setImageFile(null);
  };
  const closeForm = () => {
    setForm(null);
    setImageFile(null);
  };

  if (isPending) return <p className="py-16 text-ink">Carregando produtos…</p>;

  if (isError) {
    return (
      <div className="py-16">
        <p className="mb-4 text-ink">Não foi possível carregar os produtos.</p>
        <button onClick={() => refetch()} className="btn btn-outline">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-display-sm">Produtos</h1>
        <button
          onClick={openNew}
          className="btn bg-forest text-paper hover:bg-gold"
        >
          <Plus size={16} weight="light" />
          Novo produto
        </button>
      </div>

      {form && (
        <ProductForm
          form={form}
          imageFile={imageFile}
          onChange={setForm}
          onImageFileChange={setImageFile}
          onCancel={closeForm}
          onSubmit={() => submitProduct(form)}
          isSaving={isSaving}
        />
      )}

      {products.length === 0 ? (
        <p className="py-16 text-center text-ink">
          Nenhum produto cadastrado ainda.
        </p>
      ) : (
        <ul className="divide-y divide-line border-t border-line bg-paper">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-lg">{p.name}</h2>
                  {!p.active && (
                    <span className="rounded-sm bg-charcoal px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-paper">
                      Inativo
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink">
                  {p.category} · {p.price !== null ? money(p.price) : "Sob consulta"}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => openEdit(p)}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-ink hover:text-forest"
                >
                  <PencilSimple size={15} weight="light" />
                  Editar
                </button>
                <button
                  onClick={() => toggleActive({ id: p.id, active: !p.active })}
                  className="text-xs uppercase tracking-[0.12em] text-ink hover:text-gold-dark"
                >
                  {p.active ? "Desativar" : "Ativar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductForm({
  form,
  imageFile,
  onChange,
  onImageFileChange,
  onCancel,
  onSubmit,
  isSaving,
}: {
  form: ProductInput;
  imageFile: File | null;
  onChange: (form: ProductInput) => void;
  onImageFileChange: (file: File | null) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSaving: boolean;
}) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.imageUrl && !imageFile) return;
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 grid grid-cols-1 gap-4 border border-line bg-paper p-6 md:grid-cols-2"
    >
      <h2 className="text-display-sm md:col-span-2">
        {form.id ? "Editar produto" : "Novo produto"}
      </h2>

      <Field label="Nome">
        <input
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          required
          className="field"
        />
      </Field>
      <Field label="Slug (URL)">
        <input
          value={form.slug}
          onChange={(e) => onChange({ ...form, slug: e.target.value })}
          required
          pattern="[a-z0-9-]+"
          title="Só letras minúsculas, números e hífens"
          className="field"
        />
      </Field>
      <Field label="Categoria">
        <select
          value={form.category}
          onChange={(e) =>
            onChange({ ...form, category: e.target.value as Category })
          }
          className="field"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Modo">
        <select
          value={form.mode}
          onChange={(e) =>
            onChange({ ...form, mode: e.target.value as "buy" | "quote" })
          }
          className="field"
        >
          <option value="buy">Venda direta</option>
          <option value="quote">Sob consulta (proposta)</option>
        </select>
      </Field>
      <Field label="Preço em reais (vazio = sob consulta)">
        <input
          type="number"
          step="0.01"
          min="0"
          value={form.price ?? ""}
          onChange={(e) =>
            onChange({
              ...form,
              price: e.target.value === "" ? null : Number(e.target.value),
            })
          }
          className="field"
        />
      </Field>
      <Field label="Variação">
        <input
          value={form.variant}
          onChange={(e) => onChange({ ...form, variant: e.target.value })}
          className="field"
        />
      </Field>
      <Field label="Tamanhos (separados por vírgula)">
        <input
          value={form.sizes.join(", ")}
          onChange={(e) =>
            onChange({
              ...form,
              sizes: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="field"
        />
      </Field>
      <Field label="Foto do produto">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(e) => onImageFileChange(e.target.files?.[0] ?? null)}
          className="field file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-forest file:px-3 file:py-1 file:text-xs file:uppercase file:tracking-[0.1em] file:text-paper"
        />
        {imageFile ? (
          <span className="mt-1.5 block text-xs text-ink">
            Nova imagem: {imageFile.name}
          </span>
        ) : form.imageUrl ? (
          <span className="mt-1.5 block truncate text-xs text-ink">
            Imagem atual: {form.imageUrl}
          </span>
        ) : (
          <span className="mt-1.5 block text-xs text-gold-dark">
            Selecione uma foto para o produto.
          </span>
        )}
      </Field>
      <div className="md:col-span-2">
        <Field label="Descrição">
          <textarea
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            required
            rows={2}
            className="field"
          />
        </Field>
      </div>

      <div className="flex items-center gap-4 md:col-span-2">
        <button
          type="submit"
          disabled={isSaving}
          className="btn bg-forest text-paper hover:bg-gold disabled:opacity-60"
        >
          {isSaving ? "Salvando…" : "Salvar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs uppercase tracking-[0.12em] text-ink hover:text-gold-dark"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}
