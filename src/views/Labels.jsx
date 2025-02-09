import { useEffect, useState } from 'react'
import Title from '../components/Title'
import PageComponents from '../components/PageComponents'
import labels from '../assets/icons/labels.svg'
import DataTable from '../components/DataTable'
import axiosInstance from '../service/axios'
import Button from '@mui/material/Button'

const VISIBLE_FIELDS = ['id', 'name', 'description', 'action']

export default function Labels() {
	const [data, setData] = useState([])

	const getData = async () => {
		let { data } = await axiosInstance.get('/labels')
		setData(data)
	}

	useEffect(() => {
		getData()
	}, [])

	const handleEdit = id => {
		// Logic to handle the edit button click, for example, redirecting to edit page
		console.log('Edit button clicked for ID:', id)
	}

	const cols = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'name',
			headerName: 'Name',
			width: 300,
		},
		{
			field: 'description',
			headerName: 'Description',
			width: 200,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 400,
			renderCell: params => {
				const { id } = params.row

				const handleEdit = () => {
					console.log('Edit button clicked for ID:', id)
				}

				const handleDelete = () => {
					console.log('Delete button clicked for ID:', id)
				}
				return (
					<>
						<Button
							sx={{ margin: '10px' }}
							variant='contained'
							onClick={() => handleEdit(id)}
						>
							Editar
						</Button>
						<Button variant='contained'>Eliminar</Button>
					</>
				)
			},
		},
	]
	return (
		<>
			<PageComponents name={'Labels'} icon={labels}>
				<DataTable data={data} fields={VISIBLE_FIELDS} cols={cols} />
			</PageComponents>
		</>
	)
}
