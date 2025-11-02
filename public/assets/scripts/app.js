document.addEventListener("DOMContentLoaded", async () => {
  const autor = {
    nome: "Sidney Sheldon",
    bio: "Sidney Sheldon (1917-2007) foi um dos autores mais populares do século XX. Conhecido por romances de suspense repletos de reviravoltas, também foi roteirista vencedor do Oscar e Emmy."
  };

  document.getElementById("autor-nome").textContent = autor.nome;
  document.getElementById("autor-bio").textContent = autor.bio;

  try {
    const resposta = await fetch("http://localhost:3000/obras");
    const obras = await resposta.json();

    const container = document.getElementById("lista-obras");
    obras.forEach(obra => {
      const card = document.createElement("div");
      card.className = "col-md-4 col-lg-3 mb-4";

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${obra.imagem}" class="card-img-top" alt="${obra.titulo}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${obra.titulo}</h5>
            <p class="card-text">${obra.descricao}</p>
            <p class="text-muted"><small>Ano: ${obra.ano}</small></p>
            <a href="detalhes.html?id=${obra.id}" class="btn btn-primary mt-auto">Ver Detalhes</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    const destaques = obras.filter(o => o.destaque).slice(0, 5);
    const carouselInner = document.getElementById("carousel-inner-destaques");

    destaques.forEach((obra, index) => {
      const item = document.createElement("div");
      item.className = `carousel-item ${index === 0 ? "active" : ""}`;

      item.innerHTML = `
        <div class="d-flex align-items-center bg-white" style="height:400px;">
          <div class="flex-shrink-0" style="flex: 0 0 50%; text-align:center;">
            <img src="${obra.imagem}" alt="${obra.titulo}" 
            style="max-height: 380px; max-width: 100%; object-fit: contain; background:#fff; padding:10px;">
          </div>
          <div class="flex-grow-1 p-4">
            <h5>${obra.titulo}</h5>
            <p>${obra.descricao}</p>
          </div>
        </div>
      `;
      carouselInner.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar as obras:", erro);
  }
});
