package fi.exadeci.infrakit.repository;

import org.springframework.data.repository.CrudRepository;

import fi.exadeci.infrakit.domain.MetadataEntry;

public interface MetadataEntryRepository extends CrudRepository<MetadataEntry, Long> {

}
