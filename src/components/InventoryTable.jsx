import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdEdit, MdDelete } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

const getActionButtonStyle = (isDisabled, activeColor) => ({
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    background: 'transparent',
    border: 'none',
    padding: 0,
    color: isDisabled ? '#6b7280' : activeColor,
})


export const InventoryTable = ({ rows, role, onEdit, onDelete, onDisable, pendingRowId, isLoading }) => {
    const actionsDisabled = role !== 'admin'
    const rowActionLocked = isLoading || pendingRowId !== null || actionsDisabled

    return (
        <TableContainer component={Paper} sx={{ bgcolor: '#212124' }}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow sx={{
                        '& .MuiTableCell-root': {
                            color: '#9DAD52',
                            borderBottom: '0.5px solid rgba(255, 255, 255, 0.2)',
                        }
                    }}>
                        <TableCell align="left"><span className='bg-black rounded-xl px-4 py-2'>Name</span></TableCell>
                        <TableCell align="center"><span className='bg-black rounded-xl px-4 py-2'>Category</span></TableCell>
                        <TableCell align="center"><span className='bg-black rounded-xl px-4 py-2'>Price</span></TableCell>
                        <TableCell align="center"><span className='bg-black rounded-xl px-4 py-2'>Quantity</span></TableCell>
                        <TableCell align="center"><span className='bg-black rounded-xl px-4 py-2'>Value</span></TableCell>
                        <TableCell align="center"><span className='bg-black rounded-xl px-4 py-2'>Action</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        const editDisabled = rowActionLocked || row.isDisabled

                        return (
                            <TableRow
                                key={row.id}
                                sx={{
                                    bgcolor: row.isDisabled ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                    opacity: row.isDisabled ? 0.6 : 1,
                                    '& .MuiTableCell-root': {
                                        color: '#FFFFFF',
                                        borderBottom: '0.5px solid rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">{row.category}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.price * row.quantity}</TableCell>
                                <TableCell align="center">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                        <button
                                            type="button"
                                            onClick={() => onEdit(row)}
                                            disabled={editDisabled}
                                            style={getActionButtonStyle(editDisabled, '#22c55e')}
                                        >
                                            <MdEdit size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDisable(row.id)}
                                            disabled={rowActionLocked}
                                            title={row.isDisabled ? 'Enable product' : 'Disable product'}
                                            style={getActionButtonStyle(rowActionLocked, '#a855f7')}
                                        >
                                            {row.isDisabled ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(row.id)}
                                            disabled={rowActionLocked}
                                            style={getActionButtonStyle(rowActionLocked, '#ef4444')}
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}