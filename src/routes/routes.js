import React from 'react'
import CartoesView from '../views/CartoesView'
import CategoriasView from '../views/CategoriasView'
import ContasView from '../views/ContasView'
import MainView from '../views/MainView'
import LoginView from '../views/LoginView'
import ObjetivosView from '../views/ObjetivosView'
import TransacoesView from '../views/TransacoesView'
import DashboardView from '../views/DashboardView'
import NotFoundView from '../views/NotFoundView'
import { isAuthenticated } from '../context/loginContext'
import UserView from '../views/UserView'
import TestView from '../views/TestView'

export const routesArray = [
	{
		path: '/',
		name: 'Login',
		icon: 'display',
		element: <LoginView />
	},
	{
		path: 'dashboard',
		element: isAuthenticated() ? <MainView /> : <LoginView />,
		children: [
			{
				path: '',
				name: 'Dashboard',
				icon: 'list-check',
				element: <DashboardView />
			},
			{
				path: 'transacoes',
				name: 'Transações',
				icon: 'list-check',
				element: <TransacoesView />
			},
			{
				path: 'objetivos',
				name: 'Objetivos',
				icon: 'bullseye',
				element: <ObjetivosView />
			},
			{
				path: 'cartoes',
				name: 'Cartões',
				icon: 'credit-card',
				element: <CartoesView />
			},
			{
				path: 'contas',
				name: 'Contas',
				icon: 'building-columns',
				element: <ContasView />
			},
			{
				path: 'categoria',
				name: 'Categorias',
				icon: 'tags',
				element: <CategoriasView />
			},
			{
				path: 'test',
				name: 'Teste',
				sidebar: false,
				icon: 'tags',
				element: <TestView />
			},
			{
				path: 'user',
				name: 'User',
				sidebar: false,
				icon: 'tags',
				element: <UserView />
			},
		]
	},
	{
		path: '*',
		name: 'NotFound',
		element: <NotFoundView />
	}
]