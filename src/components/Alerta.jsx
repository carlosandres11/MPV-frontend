export const Alerta = ({alerta}) => {
  
  const { msg, error } = alerta; 

  return (
    <div className={`${error ? 'bg-red-600 text-white' : 'bg-zinc-100 text-zinc-950'} w-full rounded-xl text-center  text-xl font-bold py-2 px-3`}>
        <p>{msg}</p>
      </div>
  )
}
