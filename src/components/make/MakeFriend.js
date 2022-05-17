import { useEffect, useState, useContext } from "react";
import { Search, UnorderedList, ImageButton } from "../oui";
import styled from "styled-components";
import authContext from "../../auth/authContext";
import Faded from "../oui/text/Faded";

const Main = styled.div`
    margin: 0px;
`;

export default function MakeFriend() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const {client} = useContext(authContext);

    useEffect(()=>{
        client.searchUser(search, (res)=>{setResults(res.data.users)});
    }, [search, client]);


    return (
        <Main>
            <h1>Search for friend</h1>
            <Search value={search} onChange={(e)=>{setSearch(e.target.value)}} />
            <br/>
            <UnorderedList>
                {(results && results.length !== 0) ? results.map((user, i)=>{
                    return <ImageButton key={i} content={user.firstName + " " + user.lastName} right={"pfp"} />
                }) : <Faded key={"singleItem"}>No Results</Faded>}
            </UnorderedList>
        </Main>
    );
}


//{results.map((result)=>{
//    return <div key={result}>{result}</div>
//})}