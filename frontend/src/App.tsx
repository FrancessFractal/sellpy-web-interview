import React, { type CSSProperties, type ReactNode } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { TodoLists } from './todos/components/TodoLists'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const MainAppBar = () => {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          Things to do
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const mainWrapperStyle: CSSProperties = { display: 'flex', flexDirection: 'column' }
const centerContentWrapper: CSSProperties = { display: 'flex', justifyContent: 'center' }
const contentWrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
}

const queryClient = new QueryClient();
const MainWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={mainWrapperStyle}>
        <MainAppBar />
        <div style={centerContentWrapper}>
          <div style={contentWrapperStyle}>{children}</div>
        </div>
      </div>
    </QueryClientProvider>
  )
}

const App = () => {
  return (
    <MainWrapper>
      <TodoLists style={{ margin: '1rem' }} />
    </MainWrapper>
  )
}

export default App
