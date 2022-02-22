import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import tailwindConfig from '../../../tailwind.config.js'
import dayjs from 'dayjs'

const { colors } = tailwindConfig.theme.extend

const data = [
  {
    name: dayjs().subtract(6, 'day').format('DD/MM'),
    logins: 400,
    completions: 240,
  },
  {
    name: dayjs().subtract(5, 'day').format('DD/MM'),
    logins: 300,
    completions: 139,
  },
  {
    name: dayjs().subtract(4, 'day').format('DD/MM'),
    logins: 200,
    completions: 980,
  },
  {
    name: dayjs().subtract(3, 'day').format('DD/MM'),
    logins: 278,
    completions: 390,
  },
  {
    name: dayjs().subtract(2, 'day').format('DD/MM'),
    logins: 189,
    completions: 480,
  },
  {
    name: dayjs().subtract(1, 'day').format('DD/MM'),
    logins: 239,
    completions: 380,
  },
  {
    name: dayjs().format('DD/MM'),
    logins: 349,
    completions: 430,
  },
];

const Graph = () => {
  return (
    <ResponsiveContainer aspect={3}>
      <LineChart
        width={500}
        height={100}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis stroke={colors.main.dark} tick={{ fill: colors.main.dark }} dataKey="name" />
        <YAxis stroke={colors.main.dark} tick={{ fill: colors.main.dark }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="logins" name="User logins" stroke={colors.main.dark} />
        <Line type="monotone" dataKey="completions" name="Course completions" stroke={colors.main.DEFAULT} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default Graph