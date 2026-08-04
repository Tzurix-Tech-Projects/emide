Fotos de produto servidas localmente pelo site.

Cada produto exibe a foto do campo image_url, cadastrado no painel
(/admin/produtos). Há duas origens possíveis:

  1. Upload pelo painel — o arquivo vai para o bucket "produtos" do Supabase
     Storage e o image_url recebe a URL pública. É o caminho recomendado.
  2. Arquivo nesta pasta — nesse caso o image_url é o caminho relativo,
     por exemplo /produtos/difusor-oval.jpg

Os produtos cadastrados hoje apontam para caminhos desta pasta:

  difusor-signature.jpg
  difusor-cube.jpg
  difusor-oval.jpg
  home-spray.jpg
  agua-lencois.jpg
  sabonete.jpg
  aroma-wall.jpg
  aroma-pro.jpg

Enquanto esses arquivos não existirem, o card mostra o fundo neutro no lugar
da foto, sem imagem quebrada.

Formato: quadrado (1200x1200 ou maior), JPG ou WEBP, fundo neutro, luz natural.
