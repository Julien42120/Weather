import React, { useState } from 'react';
import '../index.css';

function Formulaire(props) {

    return (
        <div className="row" >
            <form onSubmit={props.submit} className="col-s12">
                <div className="row">
                    <div className="col s6">
                        <input
                            id="input"
                            value={props.userInput}
                            type="text"
                            placeholder="Rechercher une ville"
                            onChange={props.search}
                        />
                    </div>
                    <div className="col s6">
                        <button
                            className="btn"
                            variant="success"
                            onClick={props.submit}>Rechercher
                        </button>
                    </div>
                </div>
            </form >
        </div>
    )
}


export default Formulaire;
