import colors from "@/constants/colors";
import { getPrice } from "@/utils/getPrice";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions, Text, View } from "react-native";

interface RangeSliderProps {
  min: number;
  max: number;
  values: [number, number];
  onValuesChange: (values: number[]) => void;
  isPrice?: boolean;
}

const RangeSlider = ({ min, max, values, onValuesChange, isPrice = false }: RangeSliderProps) => {
  return (
    <View className="px-4 items-center">
      <MultiSlider
        values={values}
        sliderLength={Dimensions.get('window').width - 80}
        min={min}
        max={max}
        step={1}
        onValuesChange={onValuesChange}
        selectedStyle={{
          backgroundColor: colors.primary[300],
          height: 4,
        }}
        unselectedStyle={{
          width: '100%',
          backgroundColor: colors.primary[200],
          height: 4,
        }}
        isMarkersSeparated
        customMarkerLeft={(e) => (
          <CustomMarker value={e.currentValue} isPrice={isPrice} />
        )}
        customMarkerRight={(e) => (
          <CustomMarker value={e.currentValue} isPrice={isPrice} position="right" />
        )}
      />
    </View>
  )
}

const CustomMarker = ({ value, isPrice = false, position = 'left' }: { value: number, isPrice?: boolean, position?: 'left' | 'right' }) => (
  <>
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: colors.primary[300],
        backgroundColor: colors.white,
      }}
    />
    <Text className={`
      ${!isPrice ? 'text-center bottom-[-20px]' : ''}
      ${isPrice && position === 'left' ? 'left-0 w-150 text-left bottom-[-20px]' : 'right-0 w-150 text-right bottom-[-40px]'}
      max-w-150 text-primary-300 font-rubik-medium mt-20 absolute 
    `}>
      {isPrice ? `₩ ${getPrice(value).toLocaleString()}` : value}
    </Text>
  </>
)
export default RangeSlider