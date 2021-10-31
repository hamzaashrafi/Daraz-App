import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { toast } from '../../../shared';

class ImagePickerComponent extends Component {
	state = {
		file: null,
		fileUri: null,
		options: {},
		isModalVisible: false,
	}

	openGallery = (options = this.state.options) => {
		try {
			ImagePicker.openPicker(options)
				.then(response => {
					if (this.props.openfrom === 'add_photos_to_experience') {
						if (response.mime.search('image') !== -1) {
							try {
								ImagePicker.openCropper({
									path: response.path,
									width: 720,
									height: 1080
								}).then(image => {
									console.log('check result============>', image)
									this.props.handleImage('image', image)
								});
							} catch (error) {
								console.log(error)
								toast('error', error.message || error)
							}
						}
					} else {
						this.setState({ file: response },
							() => this.props.handleImage(response)
						)
					}
				}).catch(error => {
					console.log(error)
					toast('error', error.message || error)
				})

		} catch (error) {
			console.log(error)
			toast('error', error.message || error)
		}
	}
	openCamera = (param, options = this.state.options) => {
		try {
			ImagePicker.openCamera(options)
				.then(response => {
					console.log('response');
					this.setState({ file: response },
						() => this.props.handleImage(response)
					)
				}).catch(error => {
					toast('error', error.message || error)
					console.log(error)
				})

		} catch (error) {
			console.log(error)
			toast('error', error.message || error)
		}
	}

	handleChoosePhoto = () => {
		let defaultOptions = {
			mediaType: "photo"
		}
		defaultOptions.height = 500;
		defaultOptions.width = 500;
		defaultOptions.cropping = true,
			defaultOptions.cropperCircleOverlay = true;
		defaultOptions.includeBase64 = true
		this.setState({ options: defaultOptions, isModalVisible: true })
	}
	render() {

		const { displayImage, iconStyle, btnStyle, btnIconStyle } = this.props
		const { isModalVisible } = this.state
		return (
			<>
				{isModalVisible &&
					<Modal
						animationType="fade"
						transparent={true}
						visible={isModalVisible}
						onRequestClose={() => {
							this.setState({ isModalVisible: false })
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.textStyle}>Select Image</Text>
								<TouchableOpacity activeOpacity={0.8}
									onPress={() => {
										this.setState({ isModalVisible: false },
											this.openCamera()
										);
									}}
								>
									<Text style={styles.modalText}>Take Photo...</Text>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}
									onPress={() => {
										this.setState({ isModalVisible: false },
											this.openGallery()
										);
									}}
								>
									<Text style={styles.modalText}>Choose from Library...</Text>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}
									onPress={() => {
										this.setState({ isModalVisible: false });
									}}
								>
									<Text style={styles.cancelBtn}>CANCEL</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>}
				<View>
					{this.state.file || displayImage ?
						<>
							<View style={[styles._fillImage, styles._imgStyle]}>
								<Image
									source={{ uri: this.state.file ? this.state.file.path : displayImage }}
									style={{ width: "100%", height: "100%", alignSelf: "center", resizeMode: "cover" }}
								/>

							</View>
							{!this.props.hideAddPhotoBtn && <TouchableHighlight
								underlayColor='#a8a8a8'
								style={[styles.editButton, btnStyle]}
								onPress={() => this.handleChoosePhoto()}>
								<MaterialIcons name='add-a-photo' underlayColor='black' color='white' size={20} style={[styles.addImageIcon, btnIconStyle]} />
							</TouchableHighlight>}
						</>
						:
						<>
							<TouchableHighlight
								style={[styles._emptyImage, styles._imgStyle]}
								underlayColor='#f5f5f5'
								onPress={() => this.handleChoosePhoto()}>
								<View style={styles.imageBox}>
									{this.props.children ? this.props.children : <View>
										<MaterialIcons name='insert-photo' size={20} style={[styles.imageIcon, iconStyle]} />
									</View>}
								</View>
							</TouchableHighlight>
						</>
					}
				</View>


			</>
		);
	}
}

export default ImagePickerComponent;

const styles = StyleSheet.create({
	_fillImage: {
		backgroundColor: '#eaeaea',
		borderColor: '#979797',
		borderWidth: 1.5,
		borderRadius: (width * 0.4) / 2,
		width: width * 0.4,
		height: width * 0.4,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		overflow: "hidden",
		// marginBottom: ,
		// paddingTop: width * 0.10
	},
	_emptyImage: {
		backgroundColor: '#eaeaea',
		borderColor: '#979797',
		borderWidth: 1.5,
		borderRadius: (width * 0.4) / 2,
		width: width * 0.2,
		height: width * 0.2,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",

		// paddingTop: width * 0.10
	},
	imageIcon: {
		width: width * 0.13,
		height: width * 0.13
	},
	label: {
		paddingTop: width * 0.01,
		paddingBottom: width * 0.03,
		color: '#8e8e8e',
		textTransform: "capitalize"
	},
	addButton: {
		backgroundColor: '#121212',
		width: width * 0.10,
		height: width * 0.10,
		borderRadius: (width * 0.10) / 2,
		borderWidth: 2,
		// borderColor: "red",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		// marginTop: -15,
		position: "absolute",
		// marginTop: -10,
		// marginTop: -SIZES.height * 0.05,
		// marginBottom: SIZES.height * 0.05,
		marginLeft: width * 0.25,

	},
	editButton: {
		width: width * 0.10,
		height: width * 0.10,
		borderRadius: (width * 0.10) / 2,
		borderWidth: 2,
		borderColor: "#009387",
		justifyContent: "center",
		backgroundColor: '#009387',
		alignItems: "center",
		alignSelf: "center",
		marginTop: -32,
		// marginTop: -SIZES.height * 0.05,
		// marginBottom: SIZES.height * 0.05,
		marginLeft: width * 0.25
	},
	addImageIcon: {
		width: width * 0.05,
		height: width * 0.05
	},
	imgBtn: {
		backgroundColor: '#121212'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: 22,
		backgroundColor: 'grey'
	},
	modalView: {
		// margin: 20,
		// flex: 1,
		backgroundColor: "white",
		// borderRadius: 20,
		// padding: 35,
		width: '90%',
		alignItems: "flex-start",
		// shadowColor: "#000",
		// shadowOffset: {
		// width: 0,
		// height: 2
		// },
		// shadowOpacity: 0.25,
		// shadowRadius: 3.84,
		// elevation: 5
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		margin: 20,
		color: "black",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 20
	},
	cancelBtn: {
		margin: 20,
		color: "black",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	},
	modalText: {
		margin: 20,
		textAlign: "center",
		fontSize: 18,
		color: "black",
	},
	imageBox: {
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	_imgStyle: {
		marginTop: height * 0.04,
	}
});
