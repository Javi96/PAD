package com.pad.slaythespire;


import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class FriendFragment extends Fragment implements View.OnClickListener {


    RecyclerView recyclerView;

    FriendAdapter friendAdapter;

    public FriendFragment() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        friendAdapter = new FriendAdapter();

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_friend, container, false);
        recyclerView = view.findViewById(R.id.recycle_view_friends);
        recyclerView.setLayoutManager(new GridLayoutManager(this.getActivity(), 2));
        view.findViewById(R.id.button_add_friends).setOnClickListener(this);

        final ArrayList<String> dataList = new ArrayList<>();
        for (int i=0; i<4; i++){
            dataList.add("Dato:" + i);
        }

        friendAdapter.setData(dataList);
        friendAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Selected " +
                        dataList.get(recyclerView.getChildAdapterPosition(v)), Toast.LENGTH_LONG).show();
                //startActivity(new Intent(getActivity(), FriendRequestActivity.class));
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                View newView = getLayoutInflater().inflate(R.layout.activity_friend_request,null);
                builder.setView(newView);
                AlertDialog alertDialog = builder.create();
                alertDialog.show();
            }
        });

        recyclerView.setAdapter(friendAdapter);

        return view;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.button_add_friends:
                Toast.makeText(this.getActivity(), "friend", Toast.LENGTH_LONG).show();

                Intent intent = new Intent(this.getContext(), Contacts.class);
                startActivity(intent);
                /*AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                View newView = getLayoutInflater().inflate(R.layout.activity_contacts, null);
                builder.setView(newView);
                AlertDialog alertDialog = builder.create();
                alertDialog.show();*/

        }
    }
}
