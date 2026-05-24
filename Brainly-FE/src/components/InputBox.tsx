interface InputProps{
    placeholder: string;
    onchange: ()=> void;
}
export function InputBox({placeholder, onchange}: InputProps){
    return(
        <div>
            <input type="text" placeholder={placeholder} onChange={onchange} className="px-4 py-2 border rounded-md m-2"></input>
        </div>
    )
}