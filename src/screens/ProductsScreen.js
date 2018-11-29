import React from 'react';
import { View, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import Product from '../components/Product';
import colors from '../config/colors';

class ProductsScreen extends React.Component {

    LIMIT = 10;

    static navigationOptions = {
        title: 'Produtos',
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.accent,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        },
    }

    constructor(props) {
        super(props)

        this.state = {
            data: [
                { id: 1, name: 'Mop Giratório Fit At Home + 2 Esponjas Microfibra + Pano Multiuso', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/133826/8/133826885SZ.jpg' },
                { id: 2, name: 'Smart TV LED 32" Samsung 32J4290 HD com Conversor Digital 2 HDMI 1 USB Wi-Fi 60Hz - Preta', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/02/item/133791/1/133791184SZ.png' },
                { id: 3, name: 'Smartphone Motorola Moto G6 Play Dual Chip Android Oreo - 8.0 Tela 5.7" Octa-Core 1.4 GHz 32GB 4G Câmera 13MP - Ouro', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/133453/2/133453249SZ.jpg' },
                { id: 4, name: 'Game Pro Evolution Soccer 2019 - PS4', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/133764/4/133764451SZ.png' },
                { id: 5, name: 'Geladeira/ Refrigerador Electrolux Frost Free DW42X 380L Inox', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/7521/2/7521216_1GG.png' },
                { id: 6, name: 'TV LED 39" Philco PTV39N91D HD com Conversor Digital 2 HDMI 2 USB Som Surround 60Hz Preta', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/133758/9/133758974_1GG.png' },
                { id: 7, name: 'Notebook Expert VD1BR Intel Core I5 8GB (Geforce MX110 com 2GB) 1TB LED HD 15,6" W10 - Samsung', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/02/item/134117/1/134117141SZ.png' },
                { id: 8, name: 'MICRO-ONDAS 20 LITROS ELECTROLUX MTO30 - Branco - 110', image: 'https://images-americanas.b2w.io/produtos/01/00/oferta/47165/1/47165105_1GG.jpg' },
                { id: 9, name: 'Smart TV LED 40" Samsung Ultra HD 4k 40NU7100 com Conversor Digital 3 HDMI 2 USB Wi-Fi HDR Premium Smart Tizen', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/133756/4/133756442_1GG.png' },
                { id: 10, name: 'Balde Mop Spin 360° Preto Centrifuga Inox + Refil', image: 'https://images-americanas.b2w.io/produtos/01/00/sku/28556/9/28556907_1GG.jpg' },
                { id: 11, name: 'Kit 4 Pneus 205/60R15 CrossContact AT Continental 91H CrossFox Saveiro Cross', image: 'https://images-americanas.b2w.io/produtos/01/00/sku/39206/4/39206440_1GG.jpg' },
                { id: 12, name: 'Kit Cerveja Paulaner Hefe Weibbier Com Copo', image: 'https://images-americanas.b2w.io/produtos/01/00/sku/38356/3/38356353_1GG.jpg' },
                { id: 13, name: 'Mixer Cadence Fast Blend Colors 2 Velocidades Vermelho - 170W', image: 'https://images-americanas.b2w.io/produtos/01/00/item/121824/1/121824196_1GG.jpg' },
                { id: 14, name: 'Notebook Motion I34500AI-15 Intel Core i3 4GB 500MB HD 15,6" Linux - Positivo', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/134117/3/134117343SZ.jpg' },
                { id: 15, name: 'Kit 2 Banquetas para Bar MB-148B Vermelho ABS Giratória - Travel Max', image: 'https://images-americanas.b2w.io/produtos/01/00/item/124275/4/124275401_1GG.jpg' },
                { id: 16, name: 'Jogo Cama Microfibra 4 Pçs - Casal Noyon', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/00/item/134055/0/134055074_1GG.jpg' },
                { id: 17, name: 'Geladeira/Refrigerador Brastemp Frost Free 375 Litros BRM45 - Evox - 220V', image: 'https://images-americanas.b2w.io/produtos/01/00/item/133567/7/133567705_1GG.jpg' },
                { id: 18, name: 'Conjunto Sala de Jantar Mesa Manuele 4 Cadeiras Giovana Siena Móveis Canela/Suede Bege', image: 'https://images-americanas.b2w.io/produtos/01/00/oferta/42519/7/42519711_1GG.jpg' },
                { id: 19, name: 'Processador All In One Citrus Preto 1,2L + Liquidificador 2,2L + Espremedor de frutas 800W - Philco', image: 'https://images-americanas.b2w.io/produtos/01/00/offers/01/02/item/133136/7/133136702_1GG.png' },
                { id: 20, name: 'Chuveiro Lorenzetti Acqua Duo 220v/7800w Preto E Cromado', image: 'https://images-americanas.b2w.io/produtos/01/00/oferta/23584/6/23584688_1GG.jpg' },
            ],
            items: [],
            page: 1,
            showLoadingStart: true,
            loading: true,
            noMoreItems: false,
        }

        this.fetchDataMore = this.fetchDataMore.bind(this);
        this.paginate = this.paginate.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        setTimeout(() => {
            this.setState({ showLoadingStart: false, items: this.paginate(), loading: false })
        }, 2000);
    }

    fetchDataMore = () => {
        if (this.state.loading) return

        this.state.loading = true;

        this.state.page = this.state.page + 1

        const maxPages = Math.ceil(this.state.data.length / this.LIMIT);
        if (this.state.page > maxPages) {
            this.setState({ noMoreItems: true })
            return
        }
        setTimeout(() => {
            this.state.items.push.apply(this.state.items, this.paginate())
            this.setState({ items: this.state.items.slice(), loading: false })
        }, 2000);
    }

    paginate() {
        const page_number = this.state.page - 1
        return this.state.data.slice(page_number * this.LIMIT, (page_number + 1) * this.LIMIT)
    }

    renderLoadingMore() {
        if (this.state.noMoreItems || this.state.showLoadingStart) return null

        return (
            <View style={{ padding: 8, backgroundColor: 'white' }}>
                <ActivityIndicator style={{ alignSelf: 'center' }} size={'small'} color={colors.primary} indeterminate={true} />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                <StatusBar backgroundColor={colors.primaryDark} barStyle="light-content" />
                {this.state.showLoadingStart && (
                    <ActivityIndicator indeterminate color={colors.primary} size={'large'} />
                )}
                {!this.state.showLoadingStart && (
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.items}
                        renderItem={({ item }) => Product(item)}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 1, marginLeft: 8, flex: 1, flexDirection: "row", backgroundColor: colors.itemSeparator }} />
                        )}
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={() => this.renderLoadingMore()}
                        onEndReachedThreshold={0.1}
                        onEndReached={this.fetchDataMore}
                    />
                )}
            </View>
        );
    }
}

export default ProductsScreen
