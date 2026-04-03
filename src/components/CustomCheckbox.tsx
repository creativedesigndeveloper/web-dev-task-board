
interface CustomCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}



const CustomCheckbox = ({ checked, onChange, label }: CustomCheckboxProps) => {



  return (
    <label className="flex items-center text-left gap-2">
      <input type="checkbox" className="hidden" checked={checked} onChange={() => onChange(!checked)} />
      <div className={`w-5 h-5 rounded-md border-2 border-purple-500 ${checked ? 'bg-purple-500 shadow-[0_0_8px_2px_rgba(168,85,247,0.8)]' : 'bg-transparent border-purple-700'}`} onClick={() => onChange(!checked)}></div>
      <span className="text-text-primary">{label}</span>
    </label>
  )
}

export default CustomCheckbox