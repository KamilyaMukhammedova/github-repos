const repositoriesBlock = document.getElementById('repositories');

function createRepositoryCard(link, reposName, description, language, watchers, avatar, owner) {
  const repositoryCard = document.createElement('div');
  repositoryCard.className = 'repositories__card';
  repositoryCard.innerHTML = `
                  <h3 class="repositories__repos-name">
                    <a href="${link}" target="_blank" class="repositories__link">${reposName}</a>
                </h3>
                <p class="repositories__description">${description}</p>
                <p class="repositories__language">
                    <span class="repositories__info">Language:</span> ${language}
                </p>
                <p class="repositories__watchers">
                    <span class="repositories__info">Watchers:</span> ${watchers}
                </p>
                <div class="repositories__owner-box">
                    <img src="${avatar}" alt="${owner}" class="repositories__owner-avatar"/>
                    <span class="repositories__owner-login">${owner}</span>
                </div>
  `;

  return repositoryCard;
}

document.addEventListener('DOMContentLoaded', () => {
  const repositories = JSON.parse(localStorage.getItem('repos'));

  if (repositories) {
    repositories.forEach(repos => {
      repositoriesBlock.append(createRepositoryCard(
        repos.html_url,
        repos.name,
        repos.description,
        repos.language,
        repos.watchers,
        repos.owner.avatar_url,
        repos.owner.login
      ));
    });
  }
});

