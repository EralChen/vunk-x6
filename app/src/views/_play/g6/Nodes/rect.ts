import { registerNode } from '@antv/g6'

export function genRect () {
  registerNode(
    'zzRect',
    (cfg) => {
      console.log(cfg)
      return `
      <group>
        <rect>
          <rect style={{
            width: 150,
            height: 20,
            fill: ${cfg.style?.color},
            radius: [6, 6, 0, 0],
            cursor: 'move',
            stroke: ${cfg.style?.color}
          }} draggable="true">
            <text style={{
              marginTop: 2,
              marginLeft: 75,
              textAlign: 'center',
              fontWeight: 'bold',
              fill: '#fff' }}>{{label}}</text>
          </rect>
          <rect style={{
            width: 150,
            height: 70,
            stroke: ${cfg.style?.color},
            fill: #ffffff,
            radius: [0, 0, 6, 6],
          }}>
            <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
            <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
          </rect>
        </rect>
      </group>
     `
    },
  )
}