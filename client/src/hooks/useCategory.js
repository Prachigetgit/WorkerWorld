import {useState, useEffect } from "react";
import axios from 'axios';



export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get cat

  const getcategories = async () => {
        try {
            const {data} = await axios.get('/api/v1/category/categorys')
            setCategories(data?.category)
        } catch (error) {
            console.log(error);   
        }
    }

    useEffect(() => {
        getcategories()
    }, []);

    return categories;
}


