import React, { useState } from 'react';


function Meals() {



    const [search, setSearch] = useState('');
    const [recipe, setRecipe] = useState([]);



    const searchRecipies = async () => {

        if (search == "") {
            let enterfood = document.getElementsByClassName("enterfood")[0];
            enterfood.style.display = "block";

            setTimeout(() => { enterfood.style.display = "none" }, 5000);

            return

        }

        try {

            const recipesApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);

            const recipeData = await recipesApi.json();
            if (recipeData.meals) {

                setRecipe(recipeData.meals);

            }
            else {
                alert('Sorry food not found');

            }
        } catch (error) {
            console.error(error);
        }



    }


    const handleChange = (e) => {


        setSearch(e.target.value)

    }


    return (

        <div className='container-fluid  d-flex flex-column align-items-center justify-content-center text-center mainbox'>

            <h1 className='headtxt'> FIND YOUR FAVOURITE MEAL</h1>
            <div className="input-group text-center d-flex align-items-center justify-content-center  m-5 ">
                <div className="form-outline">
                    <input onChange={handleChange} value={search} type="search" id="form1" className="form-control searchbar " />
                </div>
                <button onClick={searchRecipies} type="button" className="btn btn-warning ">
                    <i className="bx bx-search-alt-2"></i>
                </button>

            </div>
            <div className='bg-light enterfood ' style={{}}>Enter the food</div>



            <div className="row mealc   container m-5" >
                {recipe.map((rec) => (
                    <div key={rec.idMeal} className="container text-center  col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3 ">
                        <div className="card cardbox ">
                            <img src={rec.strMealThumb} className="card-img-top" alt={recipe.strMeal} loading='lazy' />
                            <div className="card-body  d-flex flex-column align-items-center">
                                <span className="cardboxtxt">{rec.strMeal}</span>

                                <a
                                    href={rec.strYoutube}
                                    target="blank"
                                    rel="noopener noreferrer"
                                    className="btn mt-4 btn-success btn-sm"
                                >
                                    Watch Video
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>






        </div>
    );
}


export default Meals;