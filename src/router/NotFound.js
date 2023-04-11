import styled from "styled-components"
import Header from "../components/Header";

const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70vh;
    margin: 10px;
    text-align: center;
`;

export default function NotFound() {

    return (
        <>
            <Header title="page not found" />
            <Main>
                <div>
                    <h1>404</h1>
                    <h3>You fell off the raft</h3>
                    <p> The page you are looking for doesnt exist!</p>
                    <p>We messed up or you got lost. Either way we are working to make sure this doesn't happen often.</p>
                </div>
            </Main>
        </>
    );
}