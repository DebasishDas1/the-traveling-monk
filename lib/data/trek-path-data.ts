export interface TrekCoordinate {
  latitude: number
  longitude: number
}

export interface TrekPathData {
  id: number
  title: string
  route: {
    coordinates: TrekCoordinate[]
  }
}

export const trekPathData: TrekPathData[] = [
  // --- NEPAL HIMALAYAS ---
  {
    id: 1,
    title: 'Everest Base Camp Trek',
    route: {
      coordinates: [
        { latitude: 27.6869, longitude: 86.7291 }, // Lukla
        { latitude: 27.7006, longitude: 86.7137 }, // Phakding
        { latitude: 27.805, longitude: 86.712 }, // Monjo
        { latitude: 27.8069, longitude: 86.7148 }, // Jorsale
        { latitude: 27.8047, longitude: 86.7143 }, // Namche area
        { latitude: 27.8377, longitude: 86.766 }, // Tengboche
        { latitude: 27.891, longitude: 86.831 }, // Dingboche
        { latitude: 27.9447, longitude: 86.817 }, // Lobuche
        { latitude: 27.9947, longitude: 86.8286 }, // Gorakshep
        { latitude: 28.0026, longitude: 86.8528 }, // Everest Base Camp
      ],
    },
  },
  {
    id: 2,
    title: 'Annapurna Base Camp Trek',
    route: {
      coordinates: [
        { latitude: 28.296, longitude: 83.8069 }, // Nayapul area
        { latitude: 28.3678, longitude: 83.808 }, // Ghandruk
        { latitude: 28.39, longitude: 83.812 }, // Chhomrong
        { latitude: 28.417, longitude: 83.836 }, // Sinuwa
        { latitude: 28.456, longitude: 83.828 }, // Bamboo
        { latitude: 28.503, longitude: 83.87 }, // Dovan
        { latitude: 28.535, longitude: 83.885 }, // Deurali
        { latitude: 28.53, longitude: 83.895 }, // MBC
        { latitude: 28.5358, longitude: 83.879 }, // Annapurna Base Camp
        { latitude: 28.42, longitude: 83.82 }, // Jhinu Danda area
      ],
    },
  },
  {
    id: 3,
    title: 'Manaslu Circuit Trek',
    route: {
      coordinates: [
        { latitude: 28.65, longitude: 84.79 }, // Machha Khola area
        { latitude: 28.68, longitude: 84.76 }, // Jagat
        { latitude: 28.71, longitude: 84.7 }, // Deng/Pewa area
        { latitude: 28.73, longitude: 84.61 }, // Namrung
        { latitude: 28.735, longitude: 84.585 }, // Lho
        { latitude: 28.665, longitude: 84.625 }, // Sama Gaun
        { latitude: 28.645, longitude: 84.56 }, // Samdo
        { latitude: 28.655, longitude: 84.52 }, // Dharamsala
        { latitude: 28.666, longitude: 84.561 }, // Larkya Pass area
        { latitude: 28.71, longitude: 84.63 }, // Bimthang
        { latitude: 28.68, longitude: 84.74 }, // Dharapani
      ],
    },
  },
  {
    id: 4,
    title: 'Mardi Himal Trek',
    route: {
      coordinates: [
        { latitude: 28.27, longitude: 83.81 }, // Pokhara/Phedi area
        { latitude: 28.34, longitude: 83.82 }, // Pothana
        { latitude: 28.36, longitude: 83.835 }, // Forest Camp
        { latitude: 28.39, longitude: 83.85 }, // Low Camp
        { latitude: 28.405, longitude: 83.865 }, // High Camp
        { latitude: 28.425, longitude: 83.895 }, // Mardi Himal Base Camp
        { latitude: 28.39, longitude: 83.855 }, // Siding area
        { latitude: 28.335, longitude: 83.825 }, // Lwang area
      ],
    },
  },
  {
    id: 5,
    title: 'Everest Three Pass Trek',
    route: {
      coordinates: [
        { latitude: 27.6869, longitude: 86.7291 }, // Lukla
        { latitude: 27.7006, longitude: 86.7137 }, // Phakding
        { latitude: 27.8069, longitude: 86.7148 }, // Namche
        { latitude: 27.8377, longitude: 86.766 }, // Tengboche
        { latitude: 27.891, longitude: 86.831 }, // Dingboche
        { latitude: 27.946, longitude: 86.76 }, // Kongma La area
        { latitude: 27.9447, longitude: 86.817 }, // Lobuche
        { latitude: 27.9947, longitude: 86.8286 }, // Gorakshep
        { latitude: 28.0026, longitude: 86.8528 }, // Everest Base Camp
        { latitude: 27.975, longitude: 86.75 }, // Dzongla
        { latitude: 27.96, longitude: 86.69 }, // Cho La area
        { latitude: 27.95, longitude: 86.69 }, // Gokyo
        { latitude: 27.985, longitude: 86.67 }, // Renjo La area
        { latitude: 27.97, longitude: 86.62 }, // Marlung
        { latitude: 27.8069, longitude: 86.7148 }, // Namche
        { latitude: 27.6869, longitude: 86.7291 }, // Lukla
      ],
    },
  },

  // --- HIMACHAL PRADESH TREKS ---
  {
    id: 6,
    title: 'Hampta Pass Trek',
    route: {
      coordinates: [
        { latitude: 32.2432, longitude: 77.1892 }, // Manali (Jobra)
        { latitude: 32.2615, longitude: 77.2514 }, // Chika
        { latitude: 32.2512, longitude: 77.3015 }, // Bali Ka Ghera
        { latitude: 32.2389, longitude: 77.3482 }, // Shea Goru
        { latitude: 32.2215, longitude: 77.3791 }, // Hampta Pass
        { latitude: 32.1956, longitude: 77.4123 }, // Chatru (Lahaul Valley)
      ],
    },
  },
  {
    id: 7,
    title: 'Bhrigu Lake Trek',
    route: {
      coordinates: [
        { latitude: 32.2432, longitude: 77.1892 }, // Manali (Gulaba start)
        { latitude: 32.2856, longitude: 77.1425 }, // Kothi / Rola Kholi
        { latitude: 32.3124, longitude: 77.1198 }, // Bhrigu Lake
      ],
    },
  },
  {
    id: 8,
    title: 'Pin Parvati Pass Trek',
    route: {
      coordinates: [
        { latitude: 32.0125, longitude: 77.4412 }, // Barsheni
        { latitude: 32.0345, longitude: 77.4891 }, // Kalga / Kheerganga area
        { latitude: 32.0891, longitude: 77.5623 }, // Tunda Bhuj
        { latitude: 32.1456, longitude: 77.6234 }, // Pandu Bridge
        { latitude: 32.1891, longitude: 77.7123 }, // Mantalai Lake
        { latitude: 32.2345, longitude: 77.7891 }, // Pin Parvati Pass
        { latitude: 32.2912, longitude: 77.8546 }, // Mudh (Spiti Valley)
      ],
    },
  },
  {
    id: 9,
    title: 'Kheerganga Trek',
    route: {
      coordinates: [
        { latitude: 32.0125, longitude: 77.4412 }, // Barsheni
        { latitude: 32.0215, longitude: 77.4589 }, // Nakthan Village
        { latitude: 32.0312, longitude: 77.4723 }, // Rudranag Waterfall
        { latitude: 32.0356, longitude: 77.4889 }, // Kheerganga Hot Springs
      ],
    },
  },
  {
    id: 10,
    title: 'Beas Kund Trek',
    route: {
      coordinates: [
        { latitude: 32.2432, longitude: 77.1892 }, // Manali
        { latitude: 32.3156, longitude: 77.1654 }, // Solang Valley
        { latitude: 32.3456, longitude: 77.1324 }, // Dhundi
        { latitude: 32.3789, longitude: 77.0987 }, // Bakarthach
        { latitude: 32.3981, longitude: 77.0754 }, // Beas Kund glacier source
      ],
    },
  },
  {
    id: 11,
    title: 'Chandratal Lake Trek',
    route: {
      coordinates: [
        { latitude: 32.4215, longitude: 77.6123 }, // Batal
        { latitude: 32.4789, longitude: 77.5912 }, // Chandratal Lake campsite
        { latitude: 32.4856, longitude: 77.5845 }, // Chandratal Lake
      ],
    },
  },
  {
    id: 12,
    title: 'Ketan Pass Trek',
    route: {
      coordinates: [
        { latitude: 32.1524, longitude: 76.9854 }, // McLeod Ganj / Dharamshala
        { latitude: 32.2012, longitude: 76.9523 }, // Triund Hill
        { latitude: 32.2356, longitude: 76.9123 }, // Lahesh Cave
        { latitude: 32.2689, longitude: 76.8791 }, // Indrahar Pass
      ],
    },
  },
  {
    id: 13,
    title: 'Kareri Lake Trek',
    route: {
      coordinates: [
        { latitude: 32.2356, longitude: 76.3214 }, // Ghera village start
        { latitude: 32.2891, longitude: 76.3546 }, // Kareri Village
        { latitude: 32.3456, longitude: 76.3891 }, // Reoti camp
        { latitude: 32.3789, longitude: 76.4123 }, // Kareri Lake
      ],
    },
  },
]
