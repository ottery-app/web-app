import { useEffect, useState, useContext } from "react";
import { Search, UnorderedList } from "../oui";
import styled from "styled-components";
import authContext from "../../auth/authContext";

const Main = styled.div`
    margin: 20px;
`;

export default function MakeFriend() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const {client} = useContext(authContext);

    useEffect(()=>{
        client.searchUser(search, (res)=>{setResults(res.data.results)}, ()=>{});
    }, [search]);

    useEffect(()=>{
        console.log(results)
    }, [results]);

    return (
        <div>
            <h1>Search for friend</h1>
            <Search value={search} onChange={(e)=>{setSearch(e.target.value)}} />
            <br/>
            <UnorderedList>
                {[]}
            </UnorderedList>
        </div>
    );
}


//{results.map((result)=>{
//    return <div key={result}>{result}</div>
//})}