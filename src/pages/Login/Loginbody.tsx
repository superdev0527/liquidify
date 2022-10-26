import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import GoogleLogin from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { setPageName } from "store/handleSidebar";
import { createClient, Provider, useQuery  } from 'urql';
import {QueryClient, QueryClientProvider} from 'react-query';

const RewardsReport_QUERY = `
	{
		getRewardsReport(domain: "poktscan.net",

		addresses: ["da1b87226b2f6dd6f85c7f91bb74364b70999836"],
	
		from: "2022-02-01T00:00:00.000-04:00",
	
		to: "2022-05-06T13:59:59.999-04:00")
		{
			total_fee
			total_relays
			total_rewards
			total_net_tokens
			total_producers
			total_producer_tokens
		}
	}
`;

const Loginbody: React.FC = () => {
	const responseGoogle = (response: any) => {
		console.log(response);
	}

	const [enableSwitch, setEnableSwitch] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();


	const [result] = useQuery({query: RewardsReport_QUERY});

	const {data, fetching, error} = result;

	if (fetching) return <span>Loading...</span>;
	if (error) return <pre> {error.message} </pre>


	return (
		<StyledContainer>
			<ChildContainer onClick={() => {history.push('/');}}>
				<img src="images/logo.png" alt="logo" />
			</ChildContainer>
			<MapContainer>
				<img src="images/map-black.png" alt="logo" style={{width: '100%'}} />
			</MapContainer>
			<LargeGroup>
				<LoginDialog>
					<GoogleContainer>
						<GoogleLogin
							clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
							buttonText="Login via Google"
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy={'single_host_origin'}
						/>
					</GoogleContainer>
					<hr style={{margin: '0 15px 0px 15px'}}></hr>
					<InputGroup>
						<EmailGroup>
							<Box style={{fontSize: '12px', fontWeight: 500, lineHeight: '15px', color: '#4B5563', marginBottom: '9px'}}>Email Address</Box>
							<EmailInput>
								<input style={{ borderRadius: '6px', border: 'none', width: '100%', outline: 'none', height: '46px', paddingLeft: '20px'}} />
							</EmailInput>
						</EmailGroup>
						<EmailGroup>
							<PasswordTitle>
								<Box>Password</Box>
								<ForgotBox style={{color: 'black'}}>Forgot Password</ForgotBox>
							</PasswordTitle>
							<EmailInput>
								<input type="password" style={{ borderRadius: '6px', border: 'none', width: '100%', outline: 'none', height: '46px', paddingLeft: '20px'}} />
							</EmailInput>
						</EmailGroup>
						<SwitchGroup>
							<IOSwitch enableSwitch={enableSwitch} onClick={() => setEnableSwitch(!enableSwitch)}>
								<SwitchButton enableSwitch={enableSwitch}></SwitchButton>
							</IOSwitch>
							<Box style={{fontSize: '12px', fontWeight: 500, lineHeight: '15px', marginLeft: '14px'}}>Keep me signed in</Box>
						</SwitchGroup>
						<ManualLogin onClick={() => {history.push('/home');dispatch(setPageName('Home'));}}>Login</ManualLogin>
					</InputGroup>
				</LoginDialog>
				<CreateGroupe>
					<Box style={{fontSize: '15px', fontWeight: 500, lineHeight: '15px', color: '#6B7280'}}>Don’t have an account?</Box>
					<Box style={{fontSize: '15px', fontWeight: 500, lineHeight: '15px', color: 'black', marginLeft: '58px', cursor: 'pointer'}} onClick={() => {history.push('/signup');window.location.reload();}}>Create an account here</Box>
				</CreateGroupe>
			</LargeGroup>
		</StyledContainer>
	);
};

const ForgotBox = styled(Box)`
	cursor: pointer;
	&:hover {
		color: #2421cf;
		text-decoration: underline;
	}
`;

const LargeGroup = styled(Box)`
	display: flex;
	flex-direction: column;
	top: 150px;
	left: calc(50% - 300px);
	position: absolute;
	@media (max-width: 680px) {
		top: 100px;
		left: calc(50% - 200px);
	}
	@media (max-width: 500px) {
		top: 100px;
		width: 300px;
		left: calc(50% - 150px);
	}
`;
const CreateGroupe = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 35px;
`;
const ManualLogin = styled(Box)`
	background: #1C39BB;
	border-radius: 6px;
	color: white;
	padding: 16px 0;
	width: 100%;
	text-align: center;
	font-size: 14px;
	font-weight: 600;
	line-height: 17px;
	margin-top: 55px;
	cursor: pointer;
`;
const SwitchGroup = styled(Box)`
	display: flex;
	align-items: center;
	margin-top: 19px;
`;
const SwitchButton = styled(Box)<{enableSwitch: any;}>`
	position: absolute;
	left: ${({enableSwitch}) => enableSwitch ? '27px' : '2px'};
	transition: all 0.3s;
	border-radius: 50%;
	background: #D1D5DB;
	width: 24px;
	height: 24px;
	background: white;
`;
const IOSwitch = styled(Box)<{enableSwitch: any;}>`
	position: relative;
	border-radius: 16px;
	background: ${({enableSwitch}) => enableSwitch ? '#1C39BB' : '#D1D5DB'};
	width: 53px;
	height: 28px;
	padding: 2px;
	cursor: pointer;
`;
const PasswordTitle = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	font-weight: 500;
	line-height: 15px;
	color: #4B5563;
	margin-bottom: 9px;
	margin-top: 31px;
`;
const EmailInput = styled(Box)`
	background: #FFFFFF;
	border-radius: 6px;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
`;
const EmailGroup = styled(Box)`

`;
const InputGroup = styled(Box)`
	padding: 32px;
`;
const GoogleContainer = styled(Box)`
	padding: 37px 33px;
	width: 100%;
`;
const LoginDialog = styled(Box)`
	background: #FFFFFF;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
`;
const StyledContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;
const ChildContainer = styled(Box)`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	padding: 21px 81px 21px 71px;
	cursor: pointer;
`;
const MapContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 120px 0px 0px;
	width: 100%;
	background: linear-gradient(102.59deg, #FFFFFF -15.73%, #E8EBF8 126.48%);
`;
  
export default Loginbody;
