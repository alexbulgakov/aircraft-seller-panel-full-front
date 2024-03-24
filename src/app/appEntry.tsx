import { Icon36LogoVk } from '@vkontakte/icons'
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  usePlatform,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import ReactDOM from 'react-dom/client'

const App = () => {
  const platform = usePlatform()

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader before={<Icon36LogoVk />}>Goods Table</PanelHeader>
              <Group></Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider appearance="dark">
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
)
