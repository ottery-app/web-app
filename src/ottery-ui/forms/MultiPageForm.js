import { useState, createElement, useEffect, useMemo } from "react";
import Button from "../buttons/Button";
import ButtonField from "../buttons/ButtonField";
import styled from "styled-components";
import StepBar from "../progressBars/StepBar";
import Error from "../text/Error";
import { margin } from "../styles/margin";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: ${margin.medium};
    gap: ${margin.medium};
`;

export default function MultiPageForm({
    submit=(form)=>{},
    form,
    setForm,
    pages, //a page takes a form, setForm, and updateErrorHandler
    error,
    handleError,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [err, setError] = useState(error);
    const [errorHandler, setErrorHandler] = useState(()=>()=>{});

    useEffect(()=>{
        setError(error);
    }, [error]);

    function validate() {
        const err  = errorHandler();
        handleError && err ? handleError(err) : setError(err);
        return !err;
    }

    function updatePageBy(increment) {
        setCurrentPage(p=>{
            const goto = p + increment;
            if (goto > pages.length) {
                return pages.length;
            } else if (goto < 1) {
                return 1;
            } else {
                return goto;
            }
        });
    }

    function goNext() {
        if (validate()) {
            updatePageBy(1);
        }
    }

    function goBack(){
        updatePageBy(-1);
    }

    function goSubmit() {
        if (validate()) {
            submit(form);
        }
    }

    return(
        <Main>
            <StepBar 
                numFields={pages.length}
                current={currentPage}
                onClick={setCurrentPage}
            />
            {createElement(pages[currentPage - 1], {
                form:form,
                setForm: setForm,
                updateErrorHandler: (handler)=>{setErrorHandler(()=>handler)}
            })}
            <Error>{err}</Error>
            <Buttons
                current={currentPage}
                count={pages.length}
                next={goNext}
                back={goBack}
                submit={goSubmit}
            />
        </Main>
    );
}

function Buttons({current, count, next, back, submit}) {
    if (current === count) {
        return (
            <ButtonField>
                <Button
                    onClick={back}
                    type="outline"
                >
                    Back
                </Button>
                <Button
                    state="success"
                    onClick={submit}
                >
                    Submit
                </Button>
            </ButtonField>
        );
    } else if (current === 1) {
        return (
            <ButtonField>
                <Button
                    onClick={next}
                >
                    Next
                </Button>
            </ButtonField>
        );
    } else {
        return (
            <ButtonField>
                <Button
                    onClick={back}
                    type="outline"
                >
                    Back
                </Button>
                <Button
                    onClick={next}
                >
                    Next
                </Button>
            </ButtonField>
        );
    }
}