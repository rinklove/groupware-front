import React from 'react'
import CustomButton from '../../common/CustomButton'
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes'


const LoginContainer = () => {
  return (
    <>
      <CustomButton
        variant='link'
        href={`${BASIC_ROUTE}${ROUTES.LOGIN}`}
        innerText='로그인'
      />
    </>
  )
}

export default LoginContainer
