const detailsContiner = document.querySelector('.detail');

function getItem(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

function renderDetail(country) {

  function findBorderName(str) {
    const allCountries = getItem('allCountries');
    const borderName = allCountries.filter(cur => cur.alpha3Code === str)[0].name;
    return borderName;
  }

  function renderBorders(borders) {
    let html = ''
    if (borders.length < 1) {
      return 'No border countries.';
    }
    borders.forEach(cur => {
      html += `
      <li class="b-country__item">${findBorderName(cur)}</li>
      `
    })
    return html;
  }

  function renderList(list) {
    return list.map(item => item.name).join(', ');
  }

  const html = `
    <img src="${country.flag}" alt="Country flag" class="detail__img">
    <div class="detail__body">
      <h1 class="detail__header">${country.name}</h1>

      <ul class="detail__list">
        <li class="detail__info">Native Name: <span class="detail__span">${country.nativeName}</span></li>
        <li class="detail__info">Population: <span class="detail__span">${country.population}</span></li>
        <li class="detail__info">Region: <span class="detail__span">${country.region}</span></li>
        <li class="detail__info">Sub Region: <span class="detail__span">${country.subregion}</span></li>
        <li class="detail__info">Capital: <span class="detail__span">${country.capital}</span></li>
      </ul>
      <ul class="detail__list">
        <li class="detail__info">Top Level Domain: <span class="detail__span">${country.topLevelDomain}</span></li>
        <li class="detail__info">Currencies: <span class="detail__span">${renderList(country.currencies)}</span></li>
        <li class="detail__info">Languages: <span class="detail__span">${renderList(country.languages)}</span></li>
      </ul>
    <div/>
    <div class="b-country">
      <h3 class="b-country__header">Border Countries:</h3>
      <ul class="b-country__list">
        ${renderBorders(country.borders)}
      </ul>
    </div>
  `
  detailsContiner.insertAdjacentHTML('beforeend', html)
}

document.addEventListener('DOMContentLoaded', () => {
  const countryData = getItem('country');

  renderDetail(countryData[0]);
});