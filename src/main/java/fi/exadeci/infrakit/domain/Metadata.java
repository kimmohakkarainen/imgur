package fi.exadeci.infrakit.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Metadata {

	@Id @GeneratedValue
	private long metadataId;
	
	@Column
	private String id;
	
	@OneToMany(mappedBy="metadata")
	private List<MetadataEntry> entries;
	public static Metadata create(String id) {
		Metadata retval = new Metadata();
		retval.id = id;
		retval.entries = new ArrayList<>();
		return retval;
	}
	
	private Metadata() {
		
	}
	
	public List<MetadataEntry> getEntries() {
		return entries;
	}

	public long getMetadataId() {
		return metadataId;
	}

	public String getId() {
		return id;
	}
	
	
}
