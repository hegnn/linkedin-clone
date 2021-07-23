import React from 'react'
import "./InputOption.scss"

const InputOpiton = ({Title, Icon, Color}) => {
    return (
        <div className="inputOption">
            <Icon style={{color:Color}} />
            <h4>{Title} </h4>
        </div>
    )
}

export default InputOpiton
