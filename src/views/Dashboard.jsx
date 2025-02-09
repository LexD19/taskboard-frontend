import { useEffect, useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { mainListItems } from '../components/ListItems'
import { Outlet, Navigate } from 'react-router-dom'
import { userStateContext } from '../context/ContextProvider'
import UserComponent from '../components/UserComponent'
const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		}),
	},
}))
const defaultTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#501B5E',
		},
		secondary: {
			main: '#e486a9',
		},
		background: {
			default: '#8E86AA',
			paper: '#E8E7EC',
		},
		error: {
			main: '#d21e1e',
		},
		warning: {
			main: '#e09455',
		},
		info: {
			main: '#436987',
		},
		divider: 'rgba(183,176,176,0.12)',
	},
})

export default function Dashboard() {
	const { currenUser, userToken } = userStateContext()
	if (!userToken) {
		return <Navigate to='/login' />
	}
	const [open, setOpen] = useState(true)
	const toggleDrawer = () => {
		setOpen(!open)
	}
	const token = '4|58YamVBhVmFM4qWNMDhsx23jlFG0aj68tgFhzNp4'
	const data = {
		email: 'adride@outlook.com',
		password: '12345',
	}

	const login = async () => {
		const response = await fetch(
			'https://taskboard-backend-production.up.railway.app/api/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		)
		const json = await response.json()
		console.log(json)
	}

	useEffect(() => {
		// login()
	}, [])

	return (
		<ThemeProvider theme={defaultTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position='absolute' open={open}>
					<Toolbar
						sx={{
							pr: '24px',
						}}
					>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							onClick={toggleDrawer}
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component='h1'
							variant='h6'
							color='inherit'
							noWrap
							sx={{ flexGrow: 1 }}
						>
							TaskBoard
						</Typography>
						<UserComponent name={currenUser.name} />
					</Toolbar>
				</AppBar>
				<Drawer variant='permanent' open={open}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component='nav'>
						{mainListItems}
						<Divider sx={{ my: 1 }} />
					</List>
				</Drawer>
				<Box
					component='main'
					sx={{
						backgroundColor: theme =>
							theme.palette.mode === 'light'
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
					}}
				>
					<Toolbar />
					<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							<Outlet />
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	)
}
