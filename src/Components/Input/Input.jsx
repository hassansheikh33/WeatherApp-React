import classes from './Input.module.css'
import { useRef } from 'react';

export default function Input(props) {

    const cityRef = useRef();

    function sumitCityHandler(e) {
        e.preventDefault();
        const city = cityRef.current.value;
        if (city === '') {
            return;
        }
        props.onSubmit('current', props.dataFunc, `&q=${city}&aqi=no`);
    }


    return <form className={classes.form} onSubmit={sumitCityHandler}>
        <input ref={cityRef} placeholder='Enter Your City or Country' type="text" maxLength={20} />
        <button type='submit'>Check Today's Weather</button>
    </form>
}