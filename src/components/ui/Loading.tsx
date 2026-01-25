interface Props {
  borderColor?: string;
  textColor?: string;
}

export const Loading = ({ borderColor = 'white', textColor = 'white' }: Props) => {
  return (
    <div className="flex flex-col items-center">
        
        <div className="relative w-8 h-8 mb-2">
          <div className={`border-2 border-transparent border-t-${borderColor} rounded-full absolute inset-0  animate-spin`}></div>
        </div>
        
        <p className={`text-${textColor} font-medium animate-pulse`}>
          Cargando...
        </p>
    </div>
  )
}

