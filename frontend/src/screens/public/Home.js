import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { login, signup } from "../../redux/actions/user.action";
import { FlexBox, Wrapper, Toggler, Div, Para, Container, HorizontalRule, H1 } from "../../components";
import Form from "../../components/Form";
import logInImage from "../../assets/login.png";

const formStates = {
	login: 'login-form',
	signup: 'signup-form'
}

const Home = () => {
	const [formState, setFormState] = useState(formStates.login);
	const dispatch = useDispatch();

	const renderForm = () => {
		switch (formState) {
			case formStates.signup:
				return (
					<Form
						id={formState}
						fields={[
							{ type: "text", name: "fullname", placeholder: "Full Name", required: true },
							{ type: "email", name: "email", placeholder: "Email", required: true, emailValidation: true },
							{ type: "password", name: "password", placeholder: "Password", required: true }
						]}
						submitText="Create"
						onSubmit={(user) => { dispatch(signup(user, () => setFormState(formStates.login))); }}
					/>
				);
			case formStates.login:
				return (
					<React.Fragment>
						<Div>
							<H1>To Continue</H1>
							<Para fontSize="10px">We need your Email & Password</Para>
						</Div>
						<Form
							id={formState}
							fields={[
								{ type: "text", name: "email", placeholder: "Email", required: true, emailValidation: true },
								{ type: "password", name: "password", placeholder: "Password", required: true },
							]}
							submitText="Log In"
							onSubmit={(credentials) => {
								dispatch(login(credentials));
							}}
						/>
					</React.Fragment>
				);
			default:
				return null;
		}
	}

	return (
		<Wrapper flexDirection="row">
			<FlexBox alignItems="center" justifyContent="center" width="100%">
				<img src={logInImage} />
			</FlexBox>
			<FlexBox alignItems="center" justifyContent="center" width="100%">
				<Container>
					<FlexBox>
						<Toggler active={formState === formStates.login} onClick={() => setFormState(formStates.login)}>Log In</Toggler>
						<Toggler active={formState === formStates.signup} onClick={() => setFormState(formStates.signup)}>Sign up</Toggler>
					</FlexBox>
					<HorizontalRule />
					{renderForm()}
				</Container>
			</FlexBox>
		</Wrapper>
	);
};

export default Home;
