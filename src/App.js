import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    Avatar,
    Button,
    Div,
    FormLayout,
    Group,
    Header,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Text,
    View
} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: null
		};
	}

	componentDidMount() {
		bridge.send('VKWebAppGetUserInfo', {})
			.then((user) => {
				this.setState({ user });
			});
	}

	getImage = async () => {
        const imageURL = document.getElementById('url').value;
	
        if (imageURL) {
			this.setState({ imageURL });
		}
	};
	componentWillUnmount();

	render() {
		const { user, imageURL } = this.state;

		return (
            <View activePanel="main">
                <Panel id="main">
                    <PanelHeader>
						{
                            user ?
                                <PanelHeaderContent
                                    status="VK Apps Image Example"
                                    before={ <Avatar size={ 36 } src={ user.photo_100 } /> }
                                >
                                    { user.first_name }
                                </PanelHeaderContent>
								:
								'VK Apps Image Example'
						}
                    </PanelHeader>

                    <Group header={ <Header mode="secondary">Задание</Header> }>
						<Div>
							У нас есть мини-приложение, которое имеет возможность загружать изображения по внешней ссылке. Увы, в приложении допущена ошибка, из-за чего удаленный сервер получает параметры запуска пользователей, которые вставляют ссылку. Нужно объяснить почему так происходит и исправить ситуацию красиво и лаконично.
						</Div>
						<Div>
                            Для облегчения тестирования можно использовать картинку <Text weight="semibold">https://service.pavel.im/image</Text> (good code — все круто, bad code — сервер получил параметры запуска)
						</Div>

                        <FormLayout>
                            <Input type="text" id="url" />

                            <Button size="xl" onClick={ this.getImage }>Загрузить</Button>
                        </FormLayout>

						{
							!!imageURL &&
							<Div style={{ textAlign: 'center' }}>
                                <img src={ imageURL } onerror="myFunction()" />
							</Div>
						}
				<script>
					function myFunction() {
  						alert('The image could not be loaded.');
							}
				</script>
                    </Group>
                </Panel>
            </View>
		);
	}

}

export default App;
