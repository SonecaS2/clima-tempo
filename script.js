document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); //retira os efeitos padroes

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfo();
        showWarning('Carregando...');

        //a função ecodeURI serve para transformar o texto em padrao em texto propio para URL
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=77cfcffdcbebf70c0605948634383ed0&units=metric&lang=pt_br
        `;

        //fazendo a requisição à API 
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else {
            clearInfo();
            showWarning('Localização não encontrada.');
        }
    }else {
        clearInfo();
    }
});

function showInfo(json){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}


function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


//função responsavel por emitir alertas na tela
const showWarning = (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
}