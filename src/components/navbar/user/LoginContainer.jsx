import React from 'react'
import CustomButton from '../../common/CustomButton'
import { ROUTES } from '../../../constants/routes'


const LoginContainer = () => {
  return (
    <>
      <CustomButton
        variant='link'
        href={ROUTES.LOGIN}
        innerText='로그인'
      />
    </>
  )
}

export default LoginContainer
