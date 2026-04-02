import { IoExitOutline } from "react-icons/io5";
import { useRole } from '../context/RoleContext'

export const Navbar = () => {
    const { role, toggleRole } = useRole()

    return (
        <div className='flex items-center justify-end px-6 py-4'>
            <div className='flex items-center gap-4'>
                <span className={`text-xs font-medium ${role === 'admin' ? '' : 'text-gray-400'}`}>Admin</span>

                <button
                    onClick={toggleRole}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${role === 'admin' ? 'bg-[#9DAD52]' : 'bg-gray-600'
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${role === 'admin' ? 'translate-x-1' : 'translate-x-6'
                            }`}
                    />
                </button>

                <span className={`text-xs font-medium ${role !== 'admin' ? '' : 'text-gray-400'}`}>User</span>
            </div>

            <div className='w-px h-6 mx-6 bg-white/20'></div>
            <button className=''><IoExitOutline size={20} color='gray' /></button>
        </div>
    )
}
