import React,{useEffect,useMemo,use, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import './Recipes.css'

const Recipes = () => {
    const{id} = useParams()
    const[recipe,setRecipe] = useState(null);
    const[loading, setLoading] = useState(true)
    const[error,setError] = useState("");
    const API_KEY="fe3d6129751b410cb21ed62c26fccbd1"
    useEffect(()=>{
        const controller = new AbortController();
        const {signal} = controller;
        async function fetchRecipe(){
            try{
                setLoading(true);
                setError("")
                const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                const res = await fetch(url,{signal});
                if(!res.ok){
                    throw new Error(`Request Failed: ${res.status} ${res.statusText}`)
                }
                const data = await res.json();
                setRecipe(data);
            }
            catch(err){
                if(err.name === "AbortError") return
                setError(err.message || "Failed to load recipe")
            }
            finally{
                setLoading(false);
            }
        }
        fetchRecipe();
        return () => controller.abort();
    },[id])
    const ingredients = useMemo(()=>{
        if(!recipe?.extendedIngredients) return []
        return recipe.extendedIngredients.map((ing)=>ing.original)
    },[recipe])
    const instructionsHTML = useMemo(()=>{
        if(recipe?.instructions) return recipe.instructions
        const steps = recipe?.analyzedInstructions?.[0]?.steps || []
        if(!steps.length) return("")
            const listItems = steps .map((s)=> `<li>${(s.step || "").trim()}</li>`).join("")
        return `<ol>${listItems}</ol>`
    },[recipe])
    if(loading){
        return <p style={{padding:"16"}}>Loading Recipe...</p>
    }
    if(error){
        return(
            <div style={{padding:16,color:"crimson"}}><p>Unable to Load</p>
            <p style={{whiteSpace:"pre-wrap"}}>{error}</p>
            <p>
                <Link to='/'>Go Back</Link>
            </p>
            </div>
        )
    }
  return (
    <div className='rd'>
        <Link to="/" className='back-link'>&larr; Back</Link>
        <h1 className='rt'>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className='ri'/>
        <p className="rm">
            <strong>Servings:</strong>{recipe.servings || "-"}
            <strong> Ready in:</strong>{recipe.readyInMinutes ??"-"} min
            <strong> Heath score: </strong>{recipe.healthScore ?? "-"}
        </p>
        {(recipe.vegetarian || recipe.vegan) && (
            <p className="rt">
                {recipe.vegetarian && <span>Veg</span>}
                {recipe.vegan && <span>Vegan</span>}
            </p>
        )}
        <h2 className="rsec">Ingredients</h2>
        <ul className="ring">
            {ingredients.map((line,idx)=>(
                <li key={idx}>{line}</li>
            ))}
        </ul>
        <h2 className="rsec">Instructions</h2>
        {instructionsHTML ? (
            <div className="rinst" dangerouslySetInnerHTML={{ __html: instructionsHTML}}/>
        ):(
            <p>No Instructions provided</p>
        )}
    </div>
  )
}

export default Recipes