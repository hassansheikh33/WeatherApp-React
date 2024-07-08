import classes from './Card.module.css'

export default function Card(props) {
    const classList = props.className + ' ' + classes.card;
    return <div className={classList}>{props.children}</div>
}