import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../config/axios'

export default function NewsCrawl() {
    const [query, setquery] = useState(null)
    const [loading, setloading] = useState(true)
    const [data, setdata] = useState(null)
    useEffect(() => {
        getTwitter()
        setloading(false)
    }, [])

    // function getNews() {
    //     setloading(true)
    //     axios({
    //         url: 'https://newsapi.org/v2/everything?q=' + query,
    //         method: 'get',
    //         headers: {
    //             "Authorization": "c1fb00d93f4740a2981338371d25fb1d"
    //         }
    //     })
    //         .then(function (response) {
    //             // handle success
    //             console.log(response.data.articles, "<<<???");
    //             setdata(response.data.articles)
    //             setloading(false)
    //         })
    //         .catch(function (error) {
    //             // handle success
    //             console.log(error, "eror nichhh<<<???")
    //             setloading(false)
    //         })
    // }

    function getTwitter() {
        setloading(true)
        axios({
            url: 'http://65.21.157.11:8080/data/',
            method: 'get',
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.articles, "<<<???");
                setdata(response.data.articles)
                setloading(false)
            })
            .catch(function (error) {
                // handle success
                console.log(error, "eror nichhh<<<???")
                setloading(false)
            })
    }

    function saveNews() {
        setloading(true)
        Axios({
            url: 'data',
            method: 'post',
            headers: {
                "Authorization": "c1fb00d93f4740a2981338371d25fb1d"
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.articles, "<<<???");
                setdata(response.data.articles)
                setloading(false)
            })
            .catch(function (error) {
                // handle success
                console.log(error, "eror nichhh<<<???")
                setloading(false)
            })
    }

    if (loading) {
        return (<p>Loading...</p>)
    }
    return (
        <div style={{marginLeft:"500px"}}>
            <p>News Crawl</p>
            {/* <form onSubmit=
                {(e) => {
                    e.preventDefault()
                    getNews()
                }}>
                <label for="fname">Search Query</label><br></br>
                <input type="text" id="fname" name="fname" onChange={e => setquery(e.target.value)} /><br></br>

                <button className="button" type="submit">Submit</button>
            </form> */}


            <br />
            <br />
            <br />
            <br />
            <form onSubmit=
                {(e) => {
                    e.preventDefault()
                    getTwitter()
                }}>

                <button className="button" type="submit">Submit</button>
            </form>

            {data ?
                <div>
                    <p>{JSON.stringify(data)}</p>
                    <button className="button" type="submit">Save Data</button>
                </div>
                :
                <p>Empty Data</p>}
        </div>
    )
}
