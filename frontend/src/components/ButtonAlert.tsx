import { Link } from "react-router-dom";

interface btnAlertProps {
    to: string;
    title: string;
    text: string

}

export function ButtonAlert({to, title,text}: btnAlertProps){
    return <div>
        <div>
            <span>{text}</span>
            <Link to={to}>{title}</Link>
        </div>
    </div>
}