export function UserModal({name}:{name: string}){
    return <div>
        <div className="rounded-full w-12 h-12 flex justify-center items-center  bg-purple-200">
        <div className="font-semibold text-xl text-purple-800 flex">{name}</div>
        </div>
    </div>
}