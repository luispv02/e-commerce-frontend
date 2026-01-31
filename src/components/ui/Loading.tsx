interface Props {
  message?: string;
  borderStyle?: string;
  textColor?: string;
  width?: string;
  height?: string;
  spinMargin?: string
}

export const Loading = ({ width = 'w-8', height = 'h-8', message = 'Cargando...', borderStyle = 'border-t-black', textColor = 'text-black', spinMargin = 'my-2' }: Props) => {
  return (
    <div className={`flex flex-col items-center`}>
        <div className={`${width} ${height} ${spinMargin} relative`}>
          <div className={`border-2 border-transparent ${borderStyle} rounded-full absolute inset-0  animate-spin`}></div>
        </div>
        
        <p className={`${textColor} font-medium animate-pulse`}>
          { message }
        </p>
    </div>
  )
}

