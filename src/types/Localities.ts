// public string Id { get; set; }
//     public string Name { get; set; }
//     public string EnglishName { get; set; }

//     public Guid CityId { get; set; }
//     public CityDto City { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public DateTime LastUpdated { get; set; }

export type Locality = {
  id: string;
  name: string;
  englishName: string;
  cityId: string;
  createdAt: string;
  lastUpdated: string;
};

export type NewLocalityData = {
  name: string;
  englishName: string;
  cityId: string;
};
