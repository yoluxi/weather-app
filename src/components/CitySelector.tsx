import React from 'react';
import styled from 'styled-components';
import Select, { SingleValue } from 'react-select';

interface CitySelectorProps {
    currentCity: string;
    onCityChange: (cityCode: string, cityName: string) => void;
}

interface CityOption {
    value: string;
    label: string;
}

const SelectorContainer = styled.div`
  margin: 20px auto;
  max-width: 300px;
`;

// 中国主要城市及其和风天气城市代码
const cities: CityOption[] = [
    { value: '101020100', label: '上海' },
    { value: '101010100', label: '北京' },
    { value: '101280101', label: '广州' },
    { value: '101280601', label: '深圳' },
    { value: '101210101', label: '杭州' },
    { value: '101190101', label: '南京' },
    { value: '101200101', label: '武汉' },
    { value: '101230101', label: '福州' },
    { value: '101040100', label: '重庆' },
    { value: '101030100', label: '天津' },
    { value: '101110101', label: '西安' },
    { value: '101270101', label: '成都' },
    { value: '101180101', label: '郑州' },
    { value: '101050101', label: '哈尔滨' },
    { value: '101060101', label: '长春' },
    { value: '101070101', label: '沈阳' },
    { value: '101090101', label: '石家庄' },
    { value: '101100101', label: '太原' },
    { value: '101120101', label: '济南' },
    { value: '101130101', label: '乌鲁木齐' },
    { value: '101150101', label: '西宁' },
    { value: '101160101', label: '兰州' },
    { value: '101170101', label: '银川' },
    { value: '101140101', label: '拉萨' },
    { value: '101320101', label: '香港' },
    { value: '101330101', label: '澳门' },
    { value: '101340101', label: '台北' }
];

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        borderRadius: '8px',
        border: '1px solid #ccc',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid #1E90FF',
            cursor: 'text'
        }
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#1E90FF' : state.isFocused ? 'rgba(30, 144, 255, 0.1)' : null,
        '&:hover': {
            backgroundColor: state.isSelected ? '#1E90FF' : 'rgba(30, 144, 255, 0.1)',
            cursor: 'pointer'
        }
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        cursor: 'pointer'
    })
};

const CitySelector: React.FC<CitySelectorProps> = ({ currentCity, onCityChange }) => {
    const getCurrentCityOption = (): CityOption => {
        const city = cities.find(city => city.value === currentCity);
        return city || cities[0];
    };

    const handleChange = (selectedOption: SingleValue<CityOption>) => {
        if (selectedOption) {
            onCityChange(selectedOption.value, selectedOption.label);
        }
    };

    return (
        <SelectorContainer>
            <label htmlFor="city-select"  style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                borderWidth: '0'
            }}>
                选择城市
            </label>
            <Select
                inputId="city-select"
                options={cities}
                value={getCurrentCityOption()}
                onChange={handleChange}
                styles={customStyles}
                placeholder="输入城市名称..."
                isSearchable={true}
                noOptionsMessage={() => "没有找到匹配的城市"}
                aria-label="选择城市"
                closeMenuOnSelect={true}
                screenReaderStatus={({ count }) => `找到 ${count} 个结果`}
                aria-live="polite"
            />
        </SelectorContainer>
    );
};

export default CitySelector;