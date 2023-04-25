import React, { useEffect } from 'react'
import { makeRequest } from "../makeRequest"

export const fetchUser = () => {
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)

   useEffect(() => {
      makeRequest
         .get('http://localhost:1337/posts', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then(response => {
            // Handle success.
            console.log('Data: ', response.data);
         })
         .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
         });
   }, [third])

   return { data, loading, error }
}
