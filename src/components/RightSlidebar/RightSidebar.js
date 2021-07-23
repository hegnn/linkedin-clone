import { FiberManualRecord, Info } from '@material-ui/icons'
import React from 'react'
import "./RightSidebar.scss"

const RightSidebar = () => {
    const newsArticle = (heading, article) => (
        <div className="sidebarArticle">
            <div className="articleLeft">
                <FiberManualRecord/>
            </div>

            <div className="articleRight">
                <h4>{heading}</h4>
                <p>{article}</p>
            </div>
        </div>
    )

    return (
        <div className="rightSidebar">
            <div className="sidebarHeader">
                <h2>LinkedIn News</h2>
                <Info/>
            </div>
            {newsArticle("I'm looking for an internship", "Or part time job")}
            {newsArticle("EMERGENCY", "Harun is looking for an internship")}
            {newsArticle("Is JavaScript the BEST ?", "Some sources wrote that javascript is the best language ever")}
        </div>
    )
}

export default RightSidebar
