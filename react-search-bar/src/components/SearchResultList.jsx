import React from "react";
import './SearchResultList.css'
import { SearchResult } from "./SearchResult";


export const SearchResultList = ({results}) => {
    return (
        <div className="results-list">
            <div>
                {
                    results.map((result, id) => {
                        return (
                            <SearchResult result={result} key={id} />
                        )
                    } )
                }
            </div>
        </div>
    )
}