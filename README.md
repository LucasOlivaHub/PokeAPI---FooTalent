# PokeAPI

App de Pokemon desarrollada para la prueba técnica de FooTalent.

* Cuenta con un filtro de búsqueda por nombre, donde podes buscar entre 10 pokemones. Si ingresas un nombre
  inválido, se muestra una imagen al usuario indicandole que intente otro nombre.

* Filtro por peso y altura: Podemos ver los pokemones por peso o altura mayor (Higher Weight / Height), o por
  peso o altura menor (Lower Weight / Height). De más grandes a más pequeños o de pequeños a más grandes.

* Por último, tenemos el detalle de cada pokemon. Al hacer click en un pokemon, podremos visualizar en una ruta
  aparte (React Router DOM) el detalle del Pokemon, incluyendo sus características como: Habilidades, tipos, estadísticas, etc.

  Las estadísticas de cada pokemon cuentan con una lógica para que se distingan por color según valores:
  - Rojo: bajos (menor a 50)
  - Naranja: medios (entre 50 y 75)
  - Verde: altos (mayor a 75)

  






