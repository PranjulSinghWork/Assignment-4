// Professor we got the API from this website - https://developer.nytimes.com/docs/movie-reviews-api/1/overview
let baseUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
let key ="7YXFimYS2tw49DWqb7bWcGBcF4AXkC6s";

let button = document.querySelector("button");
let div = document.getElementById("div");
let searchMovie= document.getElementById("search");
let getMovie = button.addEventListener('click',fetchResult);


function fetchResult(event){
    event.preventDefault();
    url =  `${baseUrl}?query=${searchMovie.value}&api-key=${key}`;
    console.log(url);
    fetch(url).then(function(result){
        return result.json();
    }).then(function(json){
        // let jsonData = JSON.stringify(json)
        displayResult(json);
        
    });
    
}

function displayResult(json){
    console.log(json);

    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

    
    let result = json.results;
    console.log(result);

    if(result.length === 0){
        const para = document.createElement('p');
        para.textContent = 'No Movies Found';
        section.appendChild(para);

    }else{
        for(let i = 0; i< result.length;i++){
            let para = document.createElement('p');
            let img = document.createElement('img');
            
            if(result[i].multimedia !== null){
               
                img.setAttribute('src', result[i].multimedia.src);
                
            }else{
                //addded the default images so when there is no image, it shows a default poster
                img.setAttribute('src', "../images/default_poster.png" );
            }
            para.appendChild(img);           
            let linkReview = document.createElement('a');
            linkReview.setAttribute('href', result[i].link.url);
            linkReview.innerHTML = result[i].headline;
            linkReview.style.textDecoration = 'none'; 
            linkReview.style.border = '10px'; 
            para.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';  
             para.appendChild(linkReview);    
             div.appendChild(para);     
             section.appendChild(div);           
             div.appendChild(linkReview);



        }
        

    }
    
}