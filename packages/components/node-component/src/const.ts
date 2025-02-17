import { defaultAttrs, MagnetRule } from '@vunk-x6/components/port'

export const defaultGroups = {
  top: {
    position: 'top',
    attrs: defaultAttrs.circle,
  },
  right: {
    position: 'right',
    attrs: defaultAttrs.circle,
  },
  bottom: {
    position: 'bottom',
    attrs: defaultAttrs.circle,
  },
  left: {
    position: 'left',
    attrs: defaultAttrs.circle,
  },

  activeTop: {
    position: 'top',
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: MagnetRule.active,
      },
    },
  },

  activeRight: {
    position: 'right',
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: MagnetRule.active,
      },
    },
  },

  passiveBottom: {
    position: 'bottom',
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: MagnetRule.passive,
      },
    },
  },

  passiveLeft: {
    position: 'left',
    attrs: {
      circle: {
        ...defaultAttrs.circle,
        magnetRule: MagnetRule.passive,
      },
    },
  },

}
